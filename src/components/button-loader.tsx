"use client";

import { Loader2 } from "lucide-react";

function ButtonLoader() {
  return (
    <div className="flex items-center">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
    </div>
  );
}
export default ButtonLoader;
