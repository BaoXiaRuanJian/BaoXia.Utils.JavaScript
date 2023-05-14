import { StringUtil } from "./stringUtil.js"
import { JsonUtilPropertyNameSuffixKeyword } from "./constant/jsonUtilPropertyNameSuffixKeyword.js"
import { DateTime } from "./dateTime.js";

export class JsonUtil
{

    ////////////////////////////////////////////////
    // @类方法
    ////////////////////////////////////////////////

    /**
     * 解析指定的 JSON 字符串，注意。
     * @param {string} json 要进行解析的 JSON 字符串。
     * @returns {(ObjectType | null)} 解析后的对象，【注意】返回的模型对象，只包含对应的键值，不包含相关类型方法。
     */
    static parse<ObjectType>(json: string | null): ObjectType | null
    {
        if (StringUtil.isEmpty(json))
        {
            return null;
        }

        json = json as string;

        let object
            = JSON.parse(
                json,
                (key, value) =>
                {
                    if (key.endsWith(JsonUtilPropertyNameSuffixKeyword.DateTime))
                    {
                        return new DateTime(value);
                    }
                    return value;
                });
        return object as ObjectType;
    }

    /**
     *  序列化指定的对象。
     * @param {*} object 要进行序列化的对象。 
     * @returns {(string | null)} 指定对象序列化后的字符串。
     * 
     * @memberOf JsonUtil
     */
    static stringify(object: any): string | null
    {
        if (object == null)
        {
            return null;
        }

        let json = JSON.stringify(object);
        { }
        return json;
    }
}