import Image from "next/image";
import type { FC } from "react";
import { useWindowSize } from "@utils/use-window-size";
import cn from "classnames";
import { useTranslation } from "next-i18next";

interface BannerProps {
  banner: any;
  variant?: "rounded" | "default";
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
  contactDetails?: boolean;
}

function getImage(deviceWidth: number, imgObj: any) {
  return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
}

const BannerCard: FC<BannerProps> = ({
  banner,
  className,
  variant = "rounded",
  effectActive = false,
  classNameInner,
  contactDetails = null
  
}) => {
  const { width } = useWindowSize();
  const { title, image } = banner;
  const selectedImage = getImage(width, image);
  const { t } = useTranslation("common");
  
  return (
    <div className={cn("mx-auto", className)}
    >
      <div className="relative">
      <div
        className={cn(
          "h-full group flex justify-center relative overflow-hidden",
          classNameInner
        )}
        
      >
        <Image
          src={selectedImage.url}
          width={selectedImage.width}
          height={selectedImage.height}
          alt={title}
          quality={100}
          className={cn("bg-gray-300 object-fill w-full", {
            "rounded-md": variant === "rounded",
          })}
        />
        
        {effectActive && (
          <div className="absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
        )}
      </div>
      {contactDetails? 
      <div  className="text-body text-center text-xs xs:text-[0.5rem] -ml-2 sm:text-xs lg:text-lg leading-normal xl:leading-relaxed p-2 mt-2" style={{background:'#f1f1ef'}}>
        <p className="font-bold">For Exchange Offers, Reach us on <span style={{color: "#fd7a00",fontWeight:'bold'}}> <a href={`mailto:${t("text-email-details")}`}>{t("text-email-details")}</a> <span style={{color:'#5a6271'}}>(or) Call us at</span> <a href="tel:+919791022663">{t("text-phone-details")}</a></span></p>
        </div>
        :null}
      </div>
    </div>
    
  );
};


export default BannerCard;
