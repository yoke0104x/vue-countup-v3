
/**
 * 解析数字小数点位数
 */
export function parseDecimal(value: number) {
    return value.toString().split('.')?.[1]?.length || 0
}