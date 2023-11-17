import React, { useState } from "react";
import Image from "next/image";

interface MultipleUploaderProps {
  setExamplePicture: (imageNames: string[]) => void;
}

const MultipleUploader = ({ setExamplePicture }: MultipleUploaderProps) => {
  const [imageNames, setImageNames] = useState<string[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const newImageNames = Array.from(files).map((file) => file.name);
      setImageNames((prevImageNames) => [...prevImageNames, ...newImageNames]);
      setExamplePicture([...imageNames, ...newImageNames]);
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImageNames = Array.from(files).map((file) => file.name);
      setImageNames((prevImageNames) => [...prevImageNames, ...newImageNames]);
      setExamplePicture([...imageNames, ...newImageNames]);
    }
  };

  return (
    <div
      className="border-gray-300 h-[96px] w-full cursor-pointer items-center rounded-lg border border-dashed border-darkgray bg-darkgray bg-opacity-10 p-6"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        className="hidden"
        multiple
        onChange={handleFileInputChange}
      />
      <label htmlFor="imageInput">
        {imageNames.length > 0 ? (
          <div className="flex">
            {imageNames.map((imageName, index) => (
              <div
                key={index}
                className="mr-6 flex rounded-full bg-darkgray p-3 font-primary text-sm font-medium text-white"
              >
                <span>{imageName}</span>
                <Image
                  src={"/assets/images/multiple-uploader.svg"}
                  alt="uploader"
                  width="16"
                  height="16"
                  style={{ marginLeft: "10px" }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2.5 text-center font-primary text-sm font-medium text-white">
            <div>Drop images here or click to upload</div>
          </div>
        )}
      </label>
    </div>
  );
};

export default MultipleUploader;
