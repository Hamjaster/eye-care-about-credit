import { useState } from "react";
import { Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Define the structure of an image item
interface ImageItem {
  id: string;
  name: string;
  category: "Me" | "Client" | "Team Members";
  url: string;
}

// Sample image data (replace with your actual data)
const images: ImageItem[] = [
  {
    id: "1",
    name: "National Card",
    category: "Client",
    url: "https://www.desertdefenders.com/wp-content/uploads/2021/09/california-drivers-license-600x379.jpg",
  },
  {
    id: "2",
    name: "Driver License",
    category: "Me",
    url: "https://cromedocuments.com/wp-content/uploads/2023/06/bandicam-2023-01-20-17-36-16-080.jpg",
  },
  {
    id: "3",
    name: "Passport",
    category: "Team Members",
    url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_600,h_356/https://fakeidndl.com/wp-content/uploads/2019/06/Buy-California-Fake-ID-and-Driver-License-Online-.jpg",
  },
];

export default function FilesPage() {
  const [filter, setFilter] = useState("Everything");

  const filteredImages =
    filter === "Everything"
      ? images
      : images.filter((img) => img.category === filter);

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Album</h1>
      <Select onValueChange={setFilter} defaultValue="Everything">
        <SelectTrigger className="w-[180px] mb-4">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Everything">Everything</SelectItem>
          <SelectItem value="Me">Me</SelectItem>
          <SelectItem value="Client">Client</SelectItem>
          <SelectItem value="Team Members">Team Members</SelectItem>
        </SelectContent>
      </Select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative aspect-video">
              <img
                src={img.url}
                alt={img.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2">{img.name}</h2>
              <Button
                onClick={() => handleDownload(img.url, img.name)}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
