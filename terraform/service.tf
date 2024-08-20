resource "google_service_account" "dalvacationhome" {
  account_id = "serverless-dalvacationhome"
}

resource "google_artifact_registry_repository_iam_member" "repo-iam" {
  location = "us-central1"
  repository = "dal-vacation-home-sdp4"
  role   = "roles/editor"
  member = "serviceAccount:${google_service_account.dalvacationhome.email}"
}

resource "google_cloudbuild_trigger" "dalVacation-trigger" {
    project = "serverless-dalvacationhome"
  name = "dalVacation-trigger"
  location = "us-central1"
  service_account = google_service_account.dalvacationhome.name

  github {
    owner = "khushpatel25"
    name = "dalVacationHomePrivate"
    push {
      branch = "^main$"
    }
  }

  build {
    step {
      name = "gcr.io/cloud-builders/docker"
      args = ["build", "-t", "us-central1-docker.pkg.dev/serverless-dalvacationhome/dal-vacation-home-sdp4/dal-vacation-home-app:latest", "."]
    }
    images = ["us-central1-docker.pkg.dev/serverless-dalvacationhome/dal-vacation-home-sdp4/dal-vacation-home-app:latest"]
    options {
      logging = "CLOUD_LOGGING_ONLY"
    }
  }
}

resource "null_resource" "trigger_run" {
  triggers = {
    build_id = google_cloudbuild_trigger.dalVacation-trigger.id
  }

  provisioner "local-exec" {
    command = "gcloud alpha builds triggers run ${google_cloudbuild_trigger.dalVacation-trigger.name} --region=us-central1 --branch=main"
  }
}

resource "google_cloud_run_v2_service" "dalVacationService" {
  name = "dalvacationservice"
  depends_on = [ google_cloudbuild_trigger.dalVacation-trigger,null_resource.trigger_run ]
  location = "us-central1"
  project = "serverless-dalvacationhome"
  ingress = "INGRESS_TRAFFIC_ALL"
  template {
    scaling {
      min_instance_count = 0
      max_instance_count = 100
    }
    containers {
      image = "us-central1-docker.pkg.dev/serverless-dalvacationhome/dal-vacation-home-sdp4/dal-vacation-home-app:latest"
      ports {
        container_port = 8080
      }
      resources {
        limits = {
          cpu = "1"
          memory = "512Mi"
        }
      }
    }
  }
  traffic {
    type = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}

data "google_iam_policy" "no-auth" {
  binding {
    role = "roles/run.invoker"
    members = ["allUsers"]
  }
}

resource "google_cloud_run_service_iam_policy" "no-auth" {
  location = "us-central1"
  project = "serverless-dalvacationhome"
  service = google_cloud_run_v2_service.dalVacationService.name
  policy_data = data.google_iam_policy.no-auth.policy_data
}
resource "google_project_iam_member" "logs_writer" {
  project = "serverless-dalvacationhome"
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.dalvacationhome.email}"
}

