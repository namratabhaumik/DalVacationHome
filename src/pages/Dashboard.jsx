import { useState } from "react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col items-center">
      <div className="text-center font-semibold text-5xl my-3">Dashboard</div>
      {loading && (
        <div className="flex justify-center items-center h-80">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-black"></div>
        </div>
      )}
      <div className={`w-full flex justify-center ${loading ? "hidden" : ""}`}>
        <iframe
          title="Looker Studio Report 1"
          width="90%"
          height="3100"
          src="https://lookerstudio.google.com/embed/reporting/86b613ee-217d-442e-a92a-2f09c61ac766/page/IHF6D"
          allowFullScreen
          onLoad={() => setLoading(false)}
        ></iframe>
      </div>
    </div>
  );
};

export default Dashboard;
