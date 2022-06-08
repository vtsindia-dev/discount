import React from "react";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import { useUI } from "@contexts/ui.context";
import Text from "@components/ui/text";

const PasswordSuccessScreen: React.FC = () => {
	const { t } = useTranslation();
	const { setModalView, openModal, modalData: { data }, closeModal } = useUI();
  const { userName, isAuthorized } = data;

	function handleSignIn() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}

	return (
		<div className="flex flex-col space-y-4 items-center text-center bg-white p-6 md:p-8 w-full">
			<Text variant="pageHeading"
				className="mb-4 md:mb-5 lg:mb-6 xl:mb-5 2xl:mb-6 3xl:mb-8 xl:text-2xl"
			>{`Welcome back, ${userName}!`}</Text>
      {isAuthorized
        ? <div className="relative flex flex-col !mt-4 w-full">
            <Button
              onClick={closeModal}
              className="h-11 md:h-12 w-full max-w-xs flex m-auto"
            >
              {t("common:text-continue-shopping")}
            </Button>
          </div>
        : <div className="relative flex flex-col !mt-4 w-full">
          <Button
            onClick={handleSignIn}
            className="h-11 md:h-12 w-full max-w-xs flex m-auto"
          >
            {t("common:text-login")}
          </Button>
          <div onClick={closeModal} className="cursor-pointer mt-4 text-sm text-primary">Skip</div>
        </div>
      }
		</div>
	);
};

export default PasswordSuccessScreen;
