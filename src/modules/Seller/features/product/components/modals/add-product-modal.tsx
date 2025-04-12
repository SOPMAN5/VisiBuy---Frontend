import { ModalWrapperDialog } from "@/common/components/modal-wrappper";
import { dashboardConfig } from "@/lib/config";
import { useMemo, useRef, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { AddProductForm } from "./components/add-product-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/Dialog";
import { Button } from "@/ui/Button";
import { useToast } from "@/ui/use-toast";
import { useCreateSellerProduct } from "@/modules/Seller/mutations/product/useCreateSellerProduct";
import { ProductDto } from "@/modules/Seller/models/product";
import { SUCCESS_RESPONSE_CREATE_RECORD } from "@/lib/systemConfig";
import { Loader2 } from "lucide-react";
import { ProductPreview } from "./components/product-preview";
import { Spinner } from "@/common/components/spinner";
import { PreviewProductLoader } from "./components/preview-product-loader";

const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
};
export function AddProductModal() {
  const sellerProductRoute = dashboardConfig.getFullPath("seller", "products");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPreviewModal, setIsPreviewModal] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const isOpen = searchParams.get("modal") === "add-product";
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const createProductMutation = useCreateSellerProduct();
  function handleModalOpen() {
    navigate(sellerProductRoute);
  }
  const handlesubmitButtonRef = () => {
    if (submitButtonRef.current) {
      setIsLoadingModal(true);
      submitButtonRef.current.click();
    }
  };
  const handleSubmitProduct = async (data: Omit<ProductDto, "id">) => {
    try {
      const formData = new FormData();

      // Append basic form fields
      formData.append("model", data.model);
      formData.append("brand", data.brand);
      formData.append("price", data.price.toString());
      formData.append("description", data.description);
      formData.append("stock_status", data.stock_status);

      // Append each color value individually
      // When using the same key multiple times, it's treated as an array on the server
      data.color.forEach((color) => {
        formData.append("color", color);
      });

      // Append each size value individually
      data.size.forEach((size) => {
        formData.append("size", size.toString());
      });
      if (data.images) {
        data.images.forEach((imageFile) => {
          formData.append("images", imageFile);
        });
      }

      await createProductMutation.mutateAsync(formData);
      toast({
        variant: "success",
        title: "",
        description: SUCCESS_RESPONSE_CREATE_RECORD.replace(
          "{{MODEL}}",
          "Product"
        ),
        duration: 5000,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: JSON.stringify(
          error?.response.data.msg?.message || "An error occurred"
        ),
        duration: 5000,
      });
    }
  };
  return (
    <>
      <PreviewProductLoader open={isLoadingModal} setOpen={() => {}}>
        <Spinner></Spinner>
      </PreviewProductLoader>
      <ModalWrapperDialog
        title="Preview"
        open={isPreviewModal}
        className="md:max-w-[800px]"
        footer={
          <div className=" flex gap-x-5 pr-4 py-2">
            <Button
              className="tex-sm lg:tex-xl px-12 bg-transparent border-black text-black font-Montserrat hover:text-black"
              onClick={handleModalOpen}
            >
              Cancel
            </Button>
            <Button
              className="tex-sm md:text-xl text-white px-12 font-Montserrat"
              onClick={handlesubmitButtonRef}
              disabled={createProductMutation.isPending}
            >
              Upload
              {createProductMutation.isPending && (
                <Loader2 className="ml-2 animate-spin" />
              )}
            </Button>
          </div>
        }
      >
        <ProductPreview />
      </ModalWrapperDialog>
      <ModalWrapperDialog
        open={isOpen}
        onOpenChange={handleModalOpen}
        title=" Product Listing Form"
        className="md:max-w-[800px]"
        footer={
          <div className=" flex gap-x-5 pr-4 py-2">
            <Button
              className="tex-sm lg:tex-xl px-12 bg-transparent border-black text-black font-Montserrat hover:text-black"
              onClick={handleModalOpen}
            >
              Cancel
            </Button>
            <Button
              className="tex-sm md:text-xl text-white px-12 font-Montserrat"
              onClick={handlesubmitButtonRef}
            >
              Preview
            </Button>
          </div>
        }
      >
        <AddProductForm
          submitButtonRef={submitButtonRef}
          handleSubmitProduct={handleSubmitProduct}
        />
      </ModalWrapperDialog>
    </>
  );
}
