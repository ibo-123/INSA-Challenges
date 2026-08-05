import 'package:flutter/material.dart';
import 'api_service.dart';
import 'weather_model.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,

      title: "Weather App",

      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
      ),

      home: const WeatherPage(),
    );
  }
}

class WeatherPage extends StatefulWidget {
  const WeatherPage({super.key});

  @override
  State<WeatherPage> createState() => _WeatherPageState();
}

class _WeatherPageState extends State<WeatherPage> {
  final ApiService apiService = ApiService();

  Weathers? weather;

  bool loading = true;

  String get currentTime {
    final now = DateTime.now();

    return "${now.hour}:${now.minute.toString().padLeft(2, '0')}";
  }

  @override
  void initState() {
    super.initState();

    getWeather();
  }

  Future<void> getWeather() async {
    try {
      final result = await apiService.fetchWeather();

      setState(() {
        weather = result;

        loading = false;
      });
    } catch (e) {
      setState(() {
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff151522),

      body: Container(
        width: double.infinity,

        height: double.infinity,

        decoration: const BoxDecoration(
          gradient: RadialGradient(
            center: Alignment(0.3, -0.3),

            radius: 1.2,

            colors: [Color(0xff4A3728), Color(0xff24263D), Color(0xff3E3E8B)],
          ),
        ),

        child: SafeArea(
          child: loading
              ? const Center(
                  child: CircularProgressIndicator(color: Colors.white),
                )
              : weather == null
              ? const Center(
                  child: Text(
                    "No weather data",

                    style: TextStyle(color: Colors.white, fontSize: 22),
                  ),
                )
              : SingleChildScrollView(
                  child: Column(
                    children: [
                      // Top Bar
                      Padding(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 25,

                          vertical: 20,
                        ),

                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,

                          children: [
                            const Icon(
                              Icons.menu,

                              color: Colors.white,

                              size: 30,
                            ),

                            Text(
                              currentTime,

                              style: const TextStyle(
                                color: Colors.white,

                                fontSize: 18,
                              ),
                            ),

                            const Icon(
                              Icons.calendar_month,

                              color: Colors.white,

                              size: 30,
                            ),
                          ],
                        ),
                      ),

                      const SizedBox(height: 30),

                      // Location
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.center,

                        children: [
                          Icon(Icons.location_on, color: Colors.white),

                          SizedBox(width: 5),

                          Text(
                            "Addis Ababa",

                            style: TextStyle(
                              color: Colors.white,

                              fontSize: 24,

                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),

                      const SizedBox(height: 50),

                      // Weather Icon
                      const Icon(Icons.cloud, size: 120, color: Colors.white),

                      const SizedBox(height: 20),

                      // Temperature
                      Text(
                        "${weather!.temperature}°",

                        style: const TextStyle(
                          color: Colors.white,

                          fontSize: 70,

                          fontWeight: FontWeight.bold,
                        ),
                      ),

                      Text(
                        "Expect high rain today.",

                        style: TextStyle(
                          color: Colors.white.withOpacity(0.8),

                          fontSize: 22,
                        ),
                      ),

                      const SizedBox(height: 40),

                      // Weather Info
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,

                        children: [
                          weatherInfo(Icons.air, "${weather!.windSpeed} km/h"),

                          weatherInfo(
                            Icons.water_drop,

                            "${weather!.humidity}%",
                          ),

                          weatherInfo(Icons.wb_sunny, "8 hr"),
                        ],
                      ),

                      const SizedBox(height: 35),

                      // Hourly title
                      const Align(
                        alignment: Alignment.centerLeft,

                        child: Padding(
                          padding: EdgeInsets.only(left: 25),

                          child: Text(
                            "Hourly Forecast",

                            style: TextStyle(
                              color: Colors.white,

                              fontSize: 22,

                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),

                      const SizedBox(height: 15),

                      // Hourly Cards
                      SizedBox(
                        height: 130,

                        child: ListView.builder(
                          scrollDirection: Axis.horizontal,

                          padding: const EdgeInsets.symmetric(horizontal: 25),

                          itemCount: weather!.hourly.length,

                          itemBuilder: (context, index) {
                            final hour = weather!.hourly[index];

                            return hourlyCard(hour: hour);
                          },
                        ),
                      ),

                      const SizedBox(height: 30),
                    ],
                  ),
                ),
        ),
      ),
    );
  }

  Widget weatherInfo(IconData icon, String text) {
    return Column(
      children: [
        Icon(icon, color: Colors.white, size: 30),

        const SizedBox(height: 8),

        Text(text, style: const TextStyle(color: Colors.white, fontSize: 18)),
      ],
    );
  }

  Widget hourlyCard({required HourlyWeather hour}) {
    return Container(
      width: 190,
      height: 330,
      margin: const EdgeInsets.only(right: 12),

      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.15),

        borderRadius: BorderRadius.circular(20),
      ),

      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,

        children: [
          Text(
            hour.time,

            style: const TextStyle(color: Colors.white, fontSize: 14),
          ),

          const SizedBox(height: 20),

          const Icon(Icons.cloud, color: Colors.white, size: 30),

          const SizedBox(height: 10),

          Text(
            "${hour.temperature}°",

            style: const TextStyle(
              color: Colors.white,

              fontSize: 18,

              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
