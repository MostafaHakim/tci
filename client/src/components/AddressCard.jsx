import React, { useEffect, useState } from "react";

import { Card, CardContent } from "../components/ui/card";

import { Phone, MapPin, Mail } from "lucide-react";
import axios from "axios";

function AddressCard() {
  const [siteInfo, setSiteInfo] = useState({
    siteName: "",
    address: "",
    mobile: "",
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  // ডেটা লোড করা
  useEffect(() => {
    axios.get(`${baseUrl}/siteinfo`).then((res) => {
      setSiteInfo(res.data);
    });
  }, []);
  return (
    <div>
      <Card className="rounded-3xl">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5" /> {siteInfo.mobile}
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5" /> {siteInfo.address}
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5" /> {siteInfo.siteName}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddressCard;
