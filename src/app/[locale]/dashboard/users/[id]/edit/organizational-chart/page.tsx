import { iLocaleParam } from "@/Components/Entity/Locale/types";
import OrganisationalChart from "@/Main/Dashboard/Users/Edit/OrganisationalChart/OrganisationalChart";

interface iProps {
  params: Promise<iLocaleParam>;
}

export default async function Page({ params }: iProps) {
  const { locale } = await params;

  // Mock locations data for the organizational chart
  const mockLocations = [
    {
      id: "1",
      key: "head-office",
      name: "Head Office",
      isHeadLocation: true,
      employees: [
        {
          id: "1",
          name: "John Smith",
          position: "CEO",
          department: "Executive",
          avatar: "/avatars/john.jpg",
        },
        {
          id: "2",
          name: "Sarah Johnson",
          position: "CFO",
          department: "Finance",
          avatar: "/avatars/sarah.jpg",
        },
        {
          id: "3",
          name: "Mike Davis",
          position: "CTO",
          department: "Technology",
          avatar: "/avatars/mike.jpg",
        },
      ],
    },
    {
      id: "2",
      key: "branch-a",
      name: "Branch A",
      isHeadLocation: false,
      employees: [
        {
          id: "4",
          name: "Lisa Brown",
          position: "Manager",
          department: "Sales",
          avatar: "/avatars/lisa.jpg",
        },
        {
          id: "5",
          name: "Tom Wilson",
          position: "Assistant",
          department: "Sales",
          avatar: "/avatars/tom.jpg",
        },
      ],
    },
    {
      id: "3",
      key: "branch-b",
      name: "Branch B",
      isHeadLocation: false,
      employees: [
        {
          id: "6",
          name: "Emma Garcia",
          position: "Manager",
          department: "Marketing",
          avatar: "/avatars/emma.jpg",
        },
        {
          id: "7",
          name: "Alex Lee",
          position: "Designer",
          department: "Marketing",
          avatar: "/avatars/alex.jpg",
        },
      ],
    },
  ];

  return <OrganisationalChart locale={locale} locations={mockLocations} />;
}
