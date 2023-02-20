/**
 * 返回一個隨機且唯一的ID
 * @return {string} - 隨機且唯一的ID
 */
export default function (): string {
	return (
		new Date().getTime().toString(36) + Math.random().toString(36).slice(2)
	);
}
