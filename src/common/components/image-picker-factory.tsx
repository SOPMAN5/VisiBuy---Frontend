import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import { Camera, X, Upload } from "lucide-react";
import Webcam from "react-webcam";
import { ImageLinkMap } from "@/lib/utils";
interface ImagePickerProps {
  onChange: (id: string, imageData?: string) => void;
}
// Define props interfaces
interface ImagePickerFactoryProps extends ImagePickerProps {
  type: "camera" | "file";
}

const ImagePickerFactory: React.FC<ImagePickerFactoryProps> = ({
  type,
  onChange,
}) => {
  // Return the appropriate component based on type
  return type === "camera" ? (
    <CameraImagePicker onChange={onChange} />
  ) : (
    <FileImagePicker onChange={onChange} />
  );
};

const CameraImagePicker: React.FC<ImagePickerProps> = ({ onChange }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const imageId = useId();
  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: "environment", // Use back camera
  };

  const handleUserMedia = useCallback(() => {
    setIsCameraReady(true);
  }, []);

  const handleUserMediaError = useCallback((error: string | DOMException) => {
    console.error("Camera error:", error);
    setIsCameraReady(false);
  }, []);

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        console.log(imageId);
        onChange(imageId, imageSrc);
        setImage(imageSrc);
      }
    }
  }, [webcamRef]);

  const resetImage = (): void => {
    onChange(imageId);
    setImage(null);
  };

  // When not showing the camera or image, show the initial state
  const showInitialState = !image && !isCameraReady;

  return (
    <div className="relative w-64 h-64 border border-[#7F8081] p-3 rounded-lg flex items-center justify-center overflow-hidden ">
      {image ? (
        // Display captured image with remove and retake buttons
        <div className="relative w-full h-full">
          <img
            src={image}
            alt="Captured"
            className="w-full h-full object-cover"
          />
          <button
            onClick={resetImage}
            className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full opacity-80 hover:opacity-100"
            aria-label="Remove image"
          >
            <X size={20} />
          </button>
          <button
            onClick={() => setImage(null)}
            className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium opacity-80 hover:opacity-100"
          >
            Retake Photo
          </button>
        </div>
      ) : !showInitialState ? (
        // Display active camera with capture button
        <div className="relative w-full h-full">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
            mirrored={false}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {!isCameraReady && (
              <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded">
                Accessing camera...
              </div>
            )}
          </div>
          {isCameraReady && (
            <button
              onClick={captureImage}
              className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-3 rounded-full opacity-80 hover:opacity-100"
              aria-label="Take photo"
            >
              <Camera size={24} />
            </button>
          )}
        </div>
      ) : (
        // Initial state - click to start camera
        <div
          onClick={() => setIsCameraReady(true)}
          className="flex flex-col items-center justify-center cursor-pointer w-full h-full  bg-[#E3E3E3] rounded-md"
        >
          <p className="text-gray-500 text-center text-lg md:text-xl p-4 ">
            Click here to take a picture of your product.
          </p>
        </div>
      )}
    </div>
  );
};

const FileImagePicker: React.FC<ImagePickerProps> = ({ onChange }) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropAreaRef = useRef<HTMLDivElement | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = event.target.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === "string") {
          setImage(e.target.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Set up drag and drop handlers
  useEffect(() => {
    const dropArea = dropAreaRef.current;
    if (!dropArea) return;

    const preventDefault = (e: Event): void => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragOver = (e: DragEvent): void => {
      preventDefault(e);
      dropArea.classList.add("border-blue-500", "bg-blue-50");
    };

    const handleDragLeave = (e: DragEvent): void => {
      preventDefault(e);
      dropArea.classList.remove("border-blue-500", "bg-blue-50");
    };

    const handleDrop = (e: DragEvent): void => {
      preventDefault(e);
      dropArea.classList.remove("border-blue-500", "bg-blue-50");

      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && typeof e.target.result === "string") {
              setImage(e.target.result);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    };

    dropArea.addEventListener("dragover", handleDragOver as EventListener);
    dropArea.addEventListener("dragleave", handleDragLeave as EventListener);
    dropArea.addEventListener("drop", handleDrop as EventListener);

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver as EventListener);
      dropArea.removeEventListener(
        "dragleave",
        handleDragLeave as EventListener
      );
      dropArea.removeEventListener("drop", handleDrop as EventListener);
    };
  }, []);

  return (
    <div
      ref={dropAreaRef}
      onClick={handleClick}
      className="relative w-64 h-64 border-2 p-3 border-[#7F8081] rounded-lg flex items-center justify-center overflow-hidden  transition-colors duration-200 cursor-pointer"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {image ? (
        <div className="relative w-full h-full">
          <img
            src={image}
            alt="Selected"
            className="w-full h-full object-cover"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full opacity-80 hover:opacity-100"
            aria-label="Remove image"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full bg-[#E3E3E3] rounded-md">
          <p className="text-gray-500 text-center p-4 text-lg md:text-xl">
            Drag your image here, or select{" "}
            <span className="text-blue "> Click to browse</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ImagePickerFactory;
