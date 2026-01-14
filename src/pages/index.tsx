import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Github, Cloud, GitBranch, Rocket, CheckCircle } from "lucide-react";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

const steps = [
  {
    title: "GitHub Push",
    description:
      "Developer pushes code to GitHub repository. This is the starting point of the CI/CD pipeline.",
    icon: <Github className="h-6 w-6" />,
  },
  {
    title: "GitHub Webhook",
    description:
      "GitHub webhook automatically notifies Jenkins when a push or pull request occurs.",
    icon: <GitBranch className="h-6 w-6" />,
  },
  {
    title: "Jenkins CI",
    description:
      "Jenkins pulls the code, runs build & tests using Jenkinsfile.",
    icon: <CheckCircle className="h-6 w-6" />,
  },
  {
    title: "Vercel Deployment",
    description:
      "On successful build, the app is deployed automatically to Vercel.",
    icon: <Cloud className="h-6 w-6" />,
  },
];

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-200 dark:from-black dark:to-zinc-900`}
    >
      <main className="mx-auto max-w-6xl px-6 py-20">
        {/* Header */}
        <section className="mb-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            CI/CD Pipeline with GitHub, Jenkins & Vercel
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Fully automated deployment pipeline implemented by <b>Anil Babu</b>
          </p>
        </section>

        {/* Pipeline Flow */}
        <section className="grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </div>
          ))}
        </section>

        {/* Jenkinsfile Preview */}
        <section className="mt-24">
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">
            Sample Jenkinsfile
          </h2>
          <pre className="overflow-x-auto rounded-2xl bg-zinc-900 p-6 text-sm text-zinc-100">
            {`pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('vercel_token')
    }

    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Skipping tests - no test script found'
            }
        }
        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                bat '''
                npm config set cache "%WORKSPACE%\.npm-cache"
                npm config set prefix "%WORKSPACE%\.npm-global"
                set PATH=%WORKSPACE%\.npm-global;%PATH%
                npx vercel --prod --yes --token=%VERCEL_TOKEN%
                '''
            }
        }
    }
}
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Deploy') {
      steps {
        sh 'vercel --prod --yes'
      }
    }
  }
}`}
          </pre>
        </section>
      </main>
    </div>
  );
}
