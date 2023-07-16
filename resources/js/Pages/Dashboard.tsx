import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Sidenav from "@/Components/Sidenav/Sidenav";
import BaseAuthenticatedLayout from "@/Layouts/BaseAuthenticatedLayout";

export default function Dashboard({ auth }: PageProps) {
    return (
        <BaseAuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
        </BaseAuthenticatedLayout>
    );
}
