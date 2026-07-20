// app/[name]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWebsiteData } from "@/lib/get-website";

export default async function ClientPortalPage({ 
  params 
}: { 
  params: Promise<{ name: string }> 
}) {
  const { name } = await params;
  const website = await getWebsiteData(name);
console.log(website);

  if (!website) {
    notFound(); // Triggers 404 if name isn't in Firebase
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Select a Preview for {name}</h1>
      
      <div className="flex gap-6">
        <Link 
          href={`/${name}/websiteone`}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          View Website One
        </Link>
        
        <Link 
          href={`/${name}/websitetwo`}
          className="px-8 py-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          View Website Two
        </Link>
      </div>
    </div>
  );
}