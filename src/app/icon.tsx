import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          borderRadius: "8px",
          color: "white",
          fontSize: 22,
          fontWeight: 800,
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        🌿
      </div>
    ),
    {
      ...size,
    }
  );
}
