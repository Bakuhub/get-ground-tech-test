export const updateUrlParams = (params: Record<string, string | null | undefined>): void => {
    const searchParams = new URLSearchParams(window.location.search);

    Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value !== undefined && value !== null) {
            searchParams.set(key, value);
        } else {
            searchParams.delete(key);
        }
    });
    let newUrl = window.location.pathname;
    const searchParamsString = searchParams.toString();
    if (searchParamsString) {
        newUrl += `?${searchParamsString}`;
    }
    window.history.replaceState(null, "", newUrl);
};

export const getUrlParam = (key: string): string | null => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
};

export const getPageParam = () => {
    const pageParamString = getUrlParam("page");
    return pageParamString ? parseInt(pageParamString, 10):1;
};