// ...existing code...
app.use("/api/leads", leadsRoutes);

const handleSubmit = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error response from server:", {
        status: response.status,
        statusText: response.statusText,
        errorDetails,
      });
      throw new Error(
        `Server responded with status: ${response.status} - ${
          errorDetails.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    console.log("Form submitted successfully:", data);
  } catch (error) {
    console.error("Failed to submit the form:", {
      error: error.message,
      formData,
    });
    alert(
      `An error occurred while submitting the form: ${error.message}. Please check your input and try again.`
    );
  }
};
// ...existing code...
