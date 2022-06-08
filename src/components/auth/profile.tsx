import { useEffect } from 'react';
import { useProfileMutation } from '@framework/auth/use-profile';
import { getToken } from '@framework/utils/get-token';
import { isEmpty } from 'lodash';
import Router from 'next/router';

export default function Profile() {
	const { mutate: getProfile } = useProfileMutation();
	useEffect(() => {
		if (!isEmpty(getToken())) {
			getProfile();
		} else {
			const route = Router.route;
			let redirect = false;
			[ 'my-account', 'checkout', 'order' ].forEach((page: string) => {
				if (route.includes(page)) {
					redirect = true;
				}
			});
			if (redirect) {
				window.location.replace(window.location.origin);
			}
		}
	}, []);
	return null;
}
