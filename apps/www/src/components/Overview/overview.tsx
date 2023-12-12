export function Overview() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <iframe
        src="/simulation/index.html"
        width={"100%"}
        height={"100%"}
      ></iframe>
    </div>
  );
}
