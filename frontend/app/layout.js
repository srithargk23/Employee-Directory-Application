"use client";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
