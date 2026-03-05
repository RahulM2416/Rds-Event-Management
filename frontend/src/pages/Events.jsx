import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const navigate = useNavigate();
  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        setEvents(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Register event
  const handleRegister = async (eventId) => {
    try {
      await api.post("/register-event", {
        user_id: 1, // temporary user (until auth added)
        event_id: eventId,
      });

      alert("✅ Registered successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Registration failed");
    }
  };

  // Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading events...
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center">No events available</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">
                {event.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {event.description}
              </p>

              <button
                onClick={() => handleRegister(event.id)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}