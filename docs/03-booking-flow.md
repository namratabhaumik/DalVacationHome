# Booking & Reservation Flow

## Complete Booking Process

```mermaid
sequenceDiagram
    participant User as Customer/Browser
    participant React as React App
    participant API as API Gateway
    participant Lambda as AWS Lambda
    participant DDB as DynamoDB
    participant SQS as AWS SQS
    participant SNS as AWS SNS
    participant Email as Email Service

    User->>React: 1. Browse Properties
    React->>API: 2. GET /rooms
    API->>Lambda: 3. Fetch All Rooms
    Lambda->>DDB: 4. Query Rooms Table
    DDB-->>Lambda: 5. Return Room List
    Lambda-->>API: 6. Room Data
    API-->>React: 7. Render Room Cards

    User->>React: 8. Click Room Details
    React->>API: 9. GET /rooms/{roomId}
    API->>Lambda: 10. Fetch Room Details
    Lambda->>DDB: 11. Get Room + Availability
    DDB-->>Lambda: 12. Room Data + Bookings
    Lambda-->>React: 13. Display Room Details

    User->>React: 14. Click Book Now
    React->>React: 15. Open Booking Modal
    User->>React: 16. Select Check-in/Out Dates

    React->>API: 17. GET /rooms/{roomId}/availability
    API->>Lambda: 18. Check Availability
    Lambda->>DDB: 19. Query Reservations
    DDB-->>Lambda: 20. Existing Bookings
    Lambda->>Lambda: 21. Calculate Available Dates
    Lambda-->>React: 22. Return Availability Status

    User->>React: 23. Confirm Booking
    React->>React: 24. Validate Check-out > Check-in
    React->>API: 25. POST /reservations

    API->>Lambda: 26. Create Reservation Handler
    Lambda->>DDB: 27. Check Final Availability
    Lambda->>DDB: 28. Create Reservation Record
    Lambda->>DDB: 29. Update Room Availability

    alt Booking Successful
        Lambda->>SQS: 30. Queue: Add Booking Confirmation Task
        SQS->>Lambda: 31. Async: Process Booking
        Lambda->>SNS: 32. Publish: Booking Confirmed Event
        SNS->>Email: 33. Send Booking Confirmation
        Email-->>User: 34. Email: Booking Confirmation
        Lambda->>SNS: 35. Publish: Owner Notification
        SNS->>Email: 36. Email: New Booking Alert (Owner)
        Lambda-->>React: 37. Return Booking Details
        React-->>User: 38. Show Success + Booking Ref
    else Booking Failed (Room Already Booked)
        Lambda-->>React: 39. Return Error Message
        React-->>User: 40. Show Error
        React->>React: 41. Refresh Availability
    end
```

## Booking Workflow - Step by Step

### Phase 1: Property Discovery

```
1. User browses homepage
   ├─ See list of available properties
   ├─ Rooms filtered by location/amenities
   └─ Display price per night

2. GET /rooms handler:
   ├─ Query DynamoDB Rooms table
   ├─ Apply filters (location, price range)
   ├─ Return rooms with availability info
   └─ Cache results (1 hour TTL)
```

### Phase 2: Property Details Viewing

```
1. User clicks on room
   ├─ Display full details
   ├─ Show images
   ├─ List amenities
   ├─ Display price breakdown
   └─ Show reviews/ratings

2. GET /rooms/{roomId} handler:
   ├─ Query DynamoDB for room
   ├─ Fetch all reservations for room
   ├─ Calculate booked dates
   ├─ Mark available dates
   └─ Return enhanced room data
```

### Phase 3: Availability Verification

```
1. User selects check-in and check-out dates

2. Frontend validation:
   ├─ Check-out > Check-in
   ├─ Not in the past
   ├─ Calculate night count
   ├─ Calculate total price
   └─ Show price breakdown

3. Backend verification:
   ├─ GET /rooms/{roomId}/availability
   ├─ Lambda queries Reservations table
   ├─ Checks for conflicts
   ├─ Returns boolean availability
   └─ If unavailable, suggest nearby dates
```

### Phase 4: Reservation Creation

```
1. User confirms booking

2. Frontend sends:
   {
     "roomId": "room_123",
     "checkInDate": "2024-02-15",
     "checkOutDate": "2024-02-20",
     "numberOfGuests": 2,
     "totalPrice": 500.00,
     "specialRequests": "High floor preferred"
   }

3. Lambda createReservation:
   ├─ Validate JWT & extract userId
   ├─ Verify room exists
   ├─ Final availability check
   │  └─ Compare against database
   │     (catch race conditions)
   ├─ Calculate total price
   ├─ Create reservation record
   └─ Update room availability index

4. Database transaction:
   ├─ Begin atomic transaction
   ├─ Insert Reservations entry
   ├─ Update Rooms availability
   ├─ Create Booking record
   └─ Commit transaction
```

## Reservation Data Model

```json
{
  "reservationId": "res_abc123",
  "userId": "user_xyz789",
  "roomId": "room_123",
  "roomName": "Deluxe Ocean View Suite",
  "checkInDate": "2024-02-15",
  "checkOutDate": "2024-02-20",
  "numberOfNights": 5,
  "numberOfGuests": 2,
  "guestList": [
    {
      "name": "John Doe",
      "email": "john@example.com"
    },
    {
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  ],
  "pricePerNight": 100.00,
  "totalPrice": 500.00,
  "taxes": 50.00,
  "fees": 20.00,
  "finalPrice": 570.00,
  "specialRequests": "High floor preferred",
  "status": "CONFIRMED",
  "createdAt": "2024-01-20T10:30:00Z",
  "updatedAt": "2024-01-20T10:30:00Z",
  "paymentStatus": "COMPLETED",
  "cancellationPolicy": "FLEXIBLE",
  "cancellationDeadline": "2024-02-13"
}
```

## Booking Status Flow

```mermaid
graph LR
    A["PENDING"] -->|Payment Confirmed| B["CONFIRMED"]
    B -->|Check-in Time| C["CHECKED_IN"]
    C -->|Check-out Time| D["CHECKED_OUT"]
    D -->|After Checkout| E["COMPLETED"]

    B -->|Before Check-in| F["CANCELLED"]
    C -->|User Cancels| G["CANCELLED_CHECKED_IN"]

    F --> H["ARCHIVED"]
    G --> H
    E --> H
```

## Pricing Calculation

```
Base Rate (per night):          $100.00
Number of Nights:               5 nights
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal:                       $500.00
Taxes (10%):                    $50.00
Service Fee (3%):               $15.00
Cleaning Fee:                   $30.00
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Price:                    $595.00

Formula in Lambda:
totalPrice = (basePrice × nights) +
             (taxes × nights × nights) +
             serviceFee +
             cleaningFee
```

## Availability Checking Algorithm

```python
def check_availability(room_id, check_in, check_out):
    # Query all reservations for this room
    reservations = dynamodb.query(
        table='Reservations',
        key_condition='roomId = :roomId',
        expression_attributes={':roomId': room_id}
    )

    # Check for conflicts
    for reservation in reservations:
        if is_overlapping(check_in, check_out,
                         reservation.checkIn,
                         reservation.checkOut):
            return False  # Not available

    return True  # Available

def is_overlapping(start1, end1, start2, end2):
    # No overlap if one ends before other starts
    return not (end1 <= start2 or end2 <= start1)
```

## Concurrent Booking Prevention

```
Race Condition Scenario:
─────────────────────────

Time  Thread A                Thread B
──────────────────────────────────────────────
T1    Read availability ✓
T2    Check dates OK         Read availability ✓
T3    Create reservation     Check dates OK
T4    Commit
T5                           Create reservation
T6                           Commit (CONFLICT!)

Solution: DynamoDB Atomic Transactions
──────────────────────────────────────

Lambda:
1. Begin conditional write
2. Check availability (read)
3. If available, create reservation (write)
4. Atomic commit (all or nothing)
5. If conflict, transaction aborts
6. Return error to client
7. Client retries with new dates

This ensures no overbooking!
```

## Booking Confirmation Workflow

```mermaid
graph TB
    A["Booking Created"] -->|Lambda Trigger| B["Queue to SQS"]
    B -->|Worker Process| C["Send Emails"]
    C -->|Customer| D["Booking Confirmation Email"]
    C -->|Owner| E["New Booking Alert"]
    C -->|Both| F["Added to Calendar"]

    A -->|Publish Event| G["Pub/Sub Topic"]
    G -->|Cloud Function| H["Update Analytics"]
    H -->|Store Stats| I["DynamoDB Analytics"]
    I -->|Dashboard| J["Owner Dashboard"]
```

## Email Notifications

### Customer Booking Confirmation Email
```
To: customer@example.com
Subject: Booking Confirmation - Ref #RES-20240120-ABC123

Dear John,

Your reservation is confirmed!

Property: Deluxe Ocean View Suite
Location: Malibu, California
Check-in: February 15, 2024 (3:00 PM)
Check-out: February 20, 2024 (11:00 AM)
Guests: 2

Price Breakdown:
├─ 5 nights × $100.00 = $500.00
├─ Taxes (10%) = $50.00
├─ Service Fee = $15.00
├─ Cleaning Fee = $30.00
└─ TOTAL: $595.00

Booking Reference: RES-20240120-ABC123
Cancellation Deadline: February 13, 2024

[VIEW BOOKING] [CONTACT OWNER]
```

### Owner New Booking Alert
```
To: owner@example.com
Subject: New Booking - Deluxe Ocean View Suite

Hello Jane,

You have a new booking!

Guest: John Doe (john@example.com)
Dates: Feb 15-20, 2024 (5 nights)
Guests: 2
Price: $595.00 (You receive: $535.50)

[VIEW DETAILS] [MESSAGE GUEST]
```

## Cancellation Flow

```mermaid
sequenceDiagram
    participant User as Customer
    participant React as React App
    participant API as API Gateway
    participant Lambda as AWS Lambda
    participant DDB as DynamoDB

    User->>React: 1. View Bookings
    React->>API: 2. GET /reservations/user/{userId}
    API->>Lambda: 3. Fetch User Reservations
    Lambda->>DDB: 4. Query Reservations
    DDB-->>Lambda: 5. Return Bookings
    Lambda-->>React: 6. Display Bookings

    User->>React: 7. Click Cancel Booking
    React->>React: 8. Show Refund Info
    User->>React: 9. Confirm Cancellation

    React->>API: 10. DELETE /reservations/{resId}
    API->>Lambda: 11. Cancel Reservation
    Lambda->>DDB: 12. Fetch Reservation
    Lambda->>Lambda: 13. Check Cancellation Policy
    Lambda->>Lambda: 14. Calculate Refund

    alt Refundable
        Lambda->>DDB: 15. Update Reservation Status
        Lambda->>DDB: 16. Free up Room Dates
        Lambda->>SNS: 17. Send Cancellation Email
        Lambda-->>React: 18. Return Success
        React-->>User: 19. Show Refund Confirmation
    else Non-Refundable
        Lambda->>SNS: 20. Send Non-Refundable Notice
        Lambda-->>React: 21. Return Refund Details
        React-->>User: 22. Show Refund Amount
    end
```

## API Endpoints for Bookings

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/rooms` | GET | List all available rooms |
| `/rooms/{roomId}` | GET | Get room details |
| `/rooms/{roomId}/availability` | GET | Check date availability |
| `/reservations` | POST | Create booking |
| `/reservations/{resId}` | GET | Get booking details |
| `/reservations/user/{userId}` | GET | Get user's bookings |
| `/reservations/{resId}` | PUT | Update booking |
| `/reservations/{resId}` | DELETE | Cancel booking |
| `/reservations/{resId}/history` | GET | Get booking history |

---

See related flows:
- [System Architecture](./01-system-architecture.md)
- [Messaging Flow](./04-messaging-flow.md)
