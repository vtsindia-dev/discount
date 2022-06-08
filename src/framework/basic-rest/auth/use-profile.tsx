import { useUI } from "@contexts/ui.context";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import { useMutation } from "react-query";
import { get } from 'lodash';
import Cookies from "js-cookie";
import Router from "next/router";
import moment from "moment";

async function profile() {
  const response = await http.post(API_ENDPOINTS.PROFILE);
  return response?.data;
}
export const useProfileMutation = () => {
  const { setAccountDetails, authorize, unauthorize, setModalData, setModalView, openModal } = useUI();
  return useMutation(() => profile(), {
    onSuccess: (response: any) => {
      const { statusCode, responseJson } = response
      const user = Cookies.get("user") || '';
      let userName = '';
      let is24HrsCrossed = false;
      if (user) {
        const userArray = user.split('-');
        userName = userArray[0];
        const timeStamp = parseInt(userArray[1], 10);
        const currentDate = moment(new Date()).subtract(1, 'days');
        is24HrsCrossed = moment(currentDate).isSameOrAfter(moment(timeStamp));
      }
      if (statusCode === 200 && get(responseJson, 'user_id', '')) {
        window.localStorage.clear();
        userName = responseJson.display_name;
        Cookies.remove("user");
        Cookies.set("user", `${userName}-${moment(new Date()).format('x')}`);
        setAccountDetails(responseJson);
        authorize();
        if (is24HrsCrossed) {
          setModalData({ data: { userName, isAuthorized: true } });
          setModalView('SET_WELCOME_MESSAGE');
          return openModal();
        }
      } else {
        window.localStorage.clear();
        Cookies.remove("auth_token");
        if (user) {
          Cookies.remove("user");
          Cookies.set("user", `${userName}-${moment(new Date()).format('x')}`);
        }
        const route = Router.route;
        let redirect = false;
        ['my-account', 'checkout', 'order'].forEach((page: string) => {
          if (route.includes(page)) {
            redirect = true;
          }
        })
        if (redirect) {
          window.location.replace(window.location.origin);
        }
        unauthorize();
        if (is24HrsCrossed) {
          setModalData({ data: { userName, isAuthorized: false } });
          setModalView('SET_WELCOME_MESSAGE');
          return openModal();
        }
      }
    },
    onError: (data) => {
      console.log(data, "profile error response");
    },
  });
};
