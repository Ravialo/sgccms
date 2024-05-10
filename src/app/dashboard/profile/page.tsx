import { Metadata } from "next";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProfile } from "@/server/actions/profile.action";

import ProfileForm from "./components/profile-form";
import SecurityForm from "./components/security-form";

export const metadata: Metadata = {
  title: "Profile",
};

async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) return null;

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your basic profile information.</CardDescription>
        </CardHeader>
        <ProfileForm profile={profile} />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Change password for security purposes.</CardDescription>
        </CardHeader>
        <SecurityForm />
      </Card>
    </div>
  );
}

export default ProfilePage;
