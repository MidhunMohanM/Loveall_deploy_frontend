import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const Redeem = () => {
  const [result, setResult] = useState("");
  const html5QrCode = useRef(null); // Store the Html5Qrcode instance in a ref

  // Function to call API after successful scan
  const callApi = async (decodedText) => {
    try {
      alert("Scanned successfully!"); // Show popup after successful scan
      const response = await fetch(`http://anonymous677/api/endpoint`, {
        method: "GET", // or 'POST', depending on your API
        headers: {
          "Content-Type": "application/json",
          // Add any other headers your API requires
        },
      });
      const data = await response.json();
      console.log(data); // Handle your response as needed
    } catch (error) {
      console.error("Error calling the API:", error);
    }
  };
  
  // Function to start scanning
  const startScanning = async () => {
    try {
      await html5QrCode.current.start(
        { facingMode: "environment" }, // Use rear camera
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }, // This controls the QR box size
        },
        (decodedText) => {
          // Handle the decoded QR code text
          setResult(decodedText);
          console.log(`QR Code detected: ${decodedText}`);
          callApi(decodedText); // Call API with scanned result
          html5QrCode.current.stop(); // Stop scanning after detecting
        }
      );
    } catch (error) {
      console.error("Error starting QR code scanner:", error);
    }
  };

  useEffect(() => {
    // Initialize Html5Qrcode only after the component is mounted
    html5QrCode.current = new Html5Qrcode("qr-reader");

    // Start scanning when the component mounts
    startScanning();

    return () => {
      // Cleanup: Stop the QR code scanner when unmounted
      html5QrCode.current
        .stop()
        .catch((err) => console.log("Error stopping QR scanner:", err));
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div
        id="qr-reader" // This ID must match the one used in Html5Qrcode initialization
        className="border border-gray-300 rounded shadow-md w-96 h-96 relative"
      >
        {/* Semi-transparent background for overlay effect */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Add an overlay to center the QR scanner box */}
        <div className="absolute w-full h-full flex items-center justify-center">
          <div
            className="bg-white border border-gray-400 rounded-lg"
            style={{ width: '250px', height: '250px' }} // Adjust the scanning area dimensions
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Redeem;
