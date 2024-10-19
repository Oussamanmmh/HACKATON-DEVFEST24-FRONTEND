import dynamic from "next/dynamic";

// Lazy-load Dashboard component
const Dashboard = dynamic(() => import("../components/dashboard"), {
  ssr: false, // Optional: disable server-side rendering for this component
});

export default function Home() {
  return (
    <div className="">
      <Dashboard />
    </div>
  );
}
