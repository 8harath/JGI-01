export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid gap-8">
          <div className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Document Structure Information</h2>
            <p className="text-white/70 mb-4">The application is configured with the following document structure:</p>

            <pre className="bg-black/30 p-4 rounded-lg overflow-auto text-sm text-white/80">
              {`Document Structure:
- 5 TLEP documents (1 for each subject)
- 25 Modules (5 for each subject in final exams)
- 15 Modules (3 for each subject in preparatory exams)
- Cheat sheets for all subjects
- Additional resources for all subjects`}
            </pre>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-white mb-2">Document Counts:</h3>
              <ul className="list-disc list-inside text-white/70 space-y-2">
                <li>TLEP Documents: 5 (1 per subject)</li>
                <li>
                  Modules:
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Final: 25 (5 per subject)</li>
                    <li>Preparatory: 15 (3 per subject)</li>
                  </ul>
                </li>
                <li>Cheat Sheets: 10 (1 per subject per exam type)</li>
                <li>Resource Documents: 30 (3 per subject per exam type)</li>
                <li>Additional Notes: 10 (1 per subject per exam type)</li>
                <li>Reference Materials: 10 (1 per subject per exam type)</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white/[0.03] border border-white/[0.08] rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">Admin Actions</h2>
            <p className="text-white/70 mb-4">
              All document paths are pre-configured in the application. No additional setup is required.
            </p>
            <p className="text-white/70">
              The application will display placeholder content for all documents in this demo version.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
