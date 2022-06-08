import { cloneDeep } from 'lodash';

export const formatDiscountBannerData = (data: any) => {
	const mobileResolution = {
		width: 450,
		height: 140
	}
	const desktopResolution = {
		width: 885,
		height: 430
	}
	const desktopLargereSolution = {
		width: 1800,
		height: 430
	}
	const bannerData = data ? data.map((banner: any, index: number) => {
		const item = cloneDeep(banner);
		const isLastBanner = index === data.length - 1;
		const defaultResolution = isLastBanner ? desktopLargereSolution : desktopResolution; 
		item['image'] = {
			mobile: { url: item.image, ...mobileResolution },
			desktop: { url: item.image, ...defaultResolution },
		};
		item['type'] = isLastBanner ? 'large' : 'small';
		return item;
	}) : []
	return bannerData;
}

export const constructQueryParam = (_params: any) => {
	let queryParam:string = ''
	Object.keys(_params).forEach((key:string)=> {
		const value = _params[key];
		if (value !== undefined && value !== null && value !== "") {
			const connector = queryParam === '' ? '?' : '&';
			queryParam = `${queryParam}${connector}${key}=${_params[key]}`
		}
	})
	return queryParam;
}

export function getSourceParam(pathname: any, query: any) {
	if (pathname.includes("category")) {
		return `source=category`;
	} else if (pathname.includes("categories")) {
		return `source=categories`;
	} else if (pathname.includes("search")) {
		return `source=search&searchTerm=${query?.slug}`;
	}
	return '';
}