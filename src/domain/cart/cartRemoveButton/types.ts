export interface CartRemoveButtonProps {
  productId: string;
  id: string;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setProductInCart: React.Dispatch<React.SetStateAction<boolean>>;
  setIdProductCart: React.Dispatch<React.SetStateAction<string | null>>;
}
