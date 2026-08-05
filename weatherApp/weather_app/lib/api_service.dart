import 'dart:convert';
import 'package:http/http.dart' as http;

import 'weather_model.dart';

class ApiService {
  Future<Weathers> fetchWeather() async {
    final url = Uri.parse(
      "https://api.open-meteo.com/v1/forecast"
      "?latitude=8.9806"
      "&longitude=38.7578"
      "&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
      "&hourly=temperature_2m",
    );

    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);
      return Weathers.fromJson(jsonData);
    } else {
      throw Exception("Failed to load weather");
    }
  }
}
