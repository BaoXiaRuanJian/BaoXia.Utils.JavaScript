import { ObjectUtil } from "./objectUtil.js";
import { StringUtil } from "./stringUtil.js";

export class CookieUtil
{
    ////////////////////////////////////////////////
    // @类方法
    ////////////////////////////////////////////////

    /**
     * 获取指定名称的Cookie值。
     * @param cookieName 指定的Cookie名称。
     * @param cookiesStringSpecified 指定的Cookie字符串，如果不指定，则尝试从“document.cookie”对象中获取。
     * @param isIgnoreCase 是否忽略Cookie名称的大小写，默认为：false，区分大小写。。
     * @returns 返回指定名称的Cookie值。
     */
    static get(
        cookieName: string | null,
        cookiesStringSpecified: string | null = null,
        isIgnoreCase: boolean = false): string | null
    {
        if (cookieName == null
            || cookieName.length < 1)
        {
            return null;
        }

        let sourceCookiesString = cookiesStringSpecified;
        if (StringUtil.isEmpty(sourceCookiesString) == true)
        {
            if (ObjectUtil.isValid(document)
                && ObjectUtil.isValid(document.cookie))
            {
                sourceCookiesString = document.cookie;
            }
        }
        if (StringUtil.isEmpty(sourceCookiesString) == true)
        {
            return null;
        }

        sourceCookiesString = sourceCookiesString!;

        let sourceCookieStrings = sourceCookiesString.split(";");
        if (sourceCookieStrings == null
            || sourceCookieStrings.length < 1)
        {
            return null;
        }

        for (let cookieIndex = 0;
            cookieIndex < sourceCookieStrings.length;
            cookieIndex++)
        {
            let sourceCookieString = sourceCookieStrings[cookieIndex].trim();
            let isCookieNameMatched = false;
            if (isIgnoreCase)
            {
                isCookieNameMatched = StringUtil.indexOfKeywordIn(
                    sourceCookieString,
                    cookieName,
                    true) == 0;
            }
            else
            {
                isCookieNameMatched
                    = sourceCookieString.indexOf(cookieName) == 0;
            }
            if (isCookieNameMatched == true)
            {
                let sourceCookieNameEndCharIndex = sourceCookieString.length;
                let indexOfEqualMark = sourceCookieString.indexOf("=");
                if (indexOfEqualMark >= 0)
                {
                    sourceCookieNameEndCharIndex = indexOfEqualMark;
                }
                let sourceCookieName = sourceCookieString.substring(
                    0,
                    sourceCookieNameEndCharIndex)
                    .trim();
                if (sourceCookieName.length == cookieName.length)
                {
                    let cookieValue = null;
                    if (indexOfEqualMark >= 0)
                    {
                        cookieValue = sourceCookieString.substring(
                            indexOfEqualMark + 1,
                            sourceCookieString.length)
                            .trim();
                        cookieValue = decodeURIComponent(cookieValue);
                    }
                    return cookieValue;
                }
            }
        }
        return null;
    }

    /**
     * 将指定的Cookie字符串解析为Cookie键值对。
     * @param cookiesStringSpecified 指定的Cookie字符串，如果不指定，则尝试从“document.cookie”对象中获取。
     * @returns 返回解析生成的Cookie键值对。
     */
    static parseToMap(cookiesStringSpecified: string | null = null): Map<string, string> | null
    {
        let sourceCookiesString = cookiesStringSpecified;
        if (StringUtil.isEmpty(sourceCookiesString) == true)
        {
            if (ObjectUtil.isValid(document)
                && ObjectUtil.isValid(document.cookie))
            {
                sourceCookiesString = document.cookie;
            }
        }
        if (StringUtil.isEmpty(sourceCookiesString) == true)
        {
            return null;
        }

        sourceCookiesString = sourceCookiesString!;

        let sourceCookieStrings = sourceCookiesString.split(";");
        if (sourceCookieStrings == null
            || sourceCookieStrings.length < 1)
        {
            return null;
        }

        var cookieKeyValues = new Map<string, string>();
        for (let cookieIndex = 0;
            cookieIndex < sourceCookieStrings.length;
            cookieIndex++)
        {
            let sourceCookieString = sourceCookieStrings[cookieIndex].trim();
            let sourceCookieNameEndCharIndex = sourceCookieString.length;
            let indexOfEqualMark = sourceCookieString.indexOf("=");
            if (indexOfEqualMark >= 0)
            {
                sourceCookieNameEndCharIndex = indexOfEqualMark;
            }
            let cookieName = sourceCookieString.substring(
                0,
                sourceCookieNameEndCharIndex)
                .trim();
            let cookieValue: string = StringUtil.Empty;
            if (indexOfEqualMark >= 0)
            {
                cookieValue = sourceCookieString.substring(
                    indexOfEqualMark + 1,
                    sourceCookieString.length)
                    .trim();
                cookieValue = decodeURIComponent(cookieValue);
            }
            // !!!
            cookieKeyValues.set(cookieName, cookieValue!);
            // !!!
        }
        return cookieKeyValues;
    }
}