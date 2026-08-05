class Weathers {
  final String temperature;
  final String humidity;
  final String windSpeed;
  final List<HourlyWeather> hourly;

  Weathers({
    required this.temperature,
    required this.humidity,
    required this.windSpeed,
    required this.hourly,
  });

  factory Weathers.fromJson(Map<String, dynamic> json) {
    List<HourlyWeather> hourlyList = [];

    final times = json["hourly"]["time"];

    final temperatures = json["hourly"]["temperature_2m"];

    for (int i = 0; i < 10; i++) {
      hourlyList.add(
        HourlyWeather(
          time: times[i],

          icon: "cloud",

          temperature: temperatures[i].toDouble(),
        ),
      );
    }

    return Weathers(
      temperature: json["current"]["temperature_2m"].toString(),

      humidity: json["current"]["relative_humidity_2m"].toString(),

      windSpeed: json["current"]["wind_speed_10m"].toString(),

      hourly: hourlyList,
    );
  }
}

class HourlyWeather {
  final String time;

  final String icon;

  final double temperature;

  HourlyWeather({
    required this.time,

    required this.icon,

    required this.temperature,
  });
}
