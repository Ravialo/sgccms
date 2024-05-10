export type SideNav = {
  header?: string;
  separator?: boolean;
  label?: string;
  path?: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type SideNavByRole = {
  [key: string]: SideNav[];
};

export type TokenUser = {
  user: {
    id: number;
    role: "student" | "counselor" | "advisor" | "principal";
  };
};

export type ActionResponse = {
  success: boolean;
  message: string;
  data?: any;
};
