import { EditorProvider } from "./context/EditorContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <EditorProvider>{children}</EditorProvider>
      </body>
    </html>
  );
}