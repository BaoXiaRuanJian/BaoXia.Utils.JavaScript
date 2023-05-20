import { StringUtil } from "./stringUtil.js"
import { JsonUtilPropertyNameSuffixKeyword } from "./constant/jsonUtilPropertyNameSuffixKeyword.js"
import { DateTime } from "./dateTime.js";
import { ObjectUtil } from "./objectUtil.js";
import { ObjectPropertyInfo } from "./model/objectPropertyInfo.js";

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
     * 解析指定的 JSON 字符串，或转换模型对象的值到BaoXia工具集的模型。
     * @param json 指定的JSON字符串或模型对象。
     * @returns 返回解析后的对象，或转换属性值为BaoXia工具集模型后的对象。
     */
    static parseOrConvertValue<ObjectType>(jsonOrObject: string | object | null): ObjectType | null
    {
        if (jsonOrObject == null)
        {
            return null;
        }
        if (typeof (jsonOrObject) === "string")
        {
            return JsonUtil.parse(jsonOrObject);
        }
        if (typeof (jsonOrObject) != "object")
        {
            return null;
        }

        let propertyInfesNeedConvertDateTimeProperty
            = new Array<ObjectPropertyInfo>();
        ObjectUtil.enumerateAllPropertiesOf(
            jsonOrObject,
            (propertyOwnerName: string | null,
                propertyOwner: any,
                propertyName: string,
                propertyValue: any) =>
            {
                if (propertyName.endsWith(JsonUtilPropertyNameSuffixKeyword.DateTime))
                {
                    propertyInfesNeedConvertDateTimeProperty.push(
                        new ObjectPropertyInfo(
                            propertyOwner,
                            propertyName,
                            propertyValue));
                }
            });
        for (var propertyInfoNeedConvertDateTimeProperty
            of
            propertyInfesNeedConvertDateTimeProperty)
        {
            let propertyOwner = propertyInfoNeedConvertDateTimeProperty.owner;
            let propertyName = propertyInfoNeedConvertDateTimeProperty.propertyName;
            if (propertyOwner == null
                || StringUtil.isEmpty(propertyName))
            {
                continue;
            }
            let propertyValue = propertyInfoNeedConvertDateTimeProperty.propertyValue;
            if (typeof (propertyValue) != "string"
                || StringUtil.isEmpty(propertyValue))
            {
                continue;
            }

            propertyOwner = propertyOwner!;
            propertyName = propertyName!;
            propertyValue = propertyValue as string;

            // !!!
            propertyOwner[propertyName] = new DateTime(propertyValue);
            // !!!
        }
        return jsonOrObject as ObjectType;
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