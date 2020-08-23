export interface User {
  email: string
}

export interface Condition {
  name: string,
  weather: Array<{
    id: number,
    main: string,
    description: string,
    icon: string
  }>,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  },
  wind: {
    speed: number,
    deg: number
  }
}
