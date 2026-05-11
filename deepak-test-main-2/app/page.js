import OscilloscopeMonitor from "./components/OscilloscopeMonitor";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-start pt-10 min-h-screen">
        <OscilloscopeMonitor />
      </div>
    </div>
  );
}
