import Navbar from "@/components/Navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { storeId: string };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {

  const { userId } = await auth();


  if (!userId) {
    redirect("/sign-in");
  }


  const { storeId } = params;


  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
