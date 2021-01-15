export type EventListener<T, P> = (
	eventType: T,
	payload?: P
) => void

export class EventEmitter<T extends string, P extends Record<T, any>> {
	private listeners
		: { [key in T]?: EventListener<T, P[T]>[] }
		= {}

	addEventListener = <ST extends T>(
		eventType: ST,
		listener: EventListener<ST, P[ST]>
	) => {
		if (!this.listeners[eventType])
			this.listeners[eventType] = []
		this.listeners[eventType].push(listener)
	}

	removeEventListener = <ST extends T>(
		eventType: ST,
		listener: EventListener<ST, P[ST]>
	) => {
		if (!this.listeners[eventType])
			return

		const listenerIndex = this.listeners[eventType].indexOf(listener)
		if (listenerIndex < 0)
			return

		this.listeners[eventType].splice(listenerIndex, 1)
	}

	emit = <ST extends T>(
		eventType: ST,
		payload?: P[ST]
	) => {
		if (!this.listeners[eventType])
			return true

		this.listeners[eventType].forEach(listener => {
			listener(eventType, payload)
		})
	}
}