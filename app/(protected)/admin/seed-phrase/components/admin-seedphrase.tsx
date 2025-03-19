"use client";
import { Layout } from "@/components/custom/layout";
import ContatTable from "./table/seedphrase-table";

const AdminSeedPhrase = () => {
  return (
    <Layout>
      <Layout.Body>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of Seed Phrase!
            </p>
          </div>
        </div>
        <ContatTable />
      </Layout.Body>
    </Layout>
  );
};

export default AdminSeedPhrase;
