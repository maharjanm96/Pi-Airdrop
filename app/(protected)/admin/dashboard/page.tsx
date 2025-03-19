export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-6">
        {/* First card */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border bg-card p-4 rounded-md">
              <p className="text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold">1,258</p>
            </div>
            <div className="border bg-card p-4 rounded-md">
              <p className="text-sm font-medium">Total Airdrops</p>
              <p className="text-2xl font-bold">8,547</p>
            </div>
            <div className="border bg-card p-4 rounded-md">
              <p className="text-sm font-medium">Pending Requests</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="border bg-card p-4 rounded-md">
              <p className="text-sm font-medium">Cancelled Requests</p>
              <p className="text-2xl font-bold">10</p>
            </div>
          </div>
        </div>

        {/* Second card */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-medium">User #{item}0342</p>
                  <p className="text-sm text-muted-foreground">
                    Received 100 Pi
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {item} hour{item !== 1 ? "s" : ""} ago
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
