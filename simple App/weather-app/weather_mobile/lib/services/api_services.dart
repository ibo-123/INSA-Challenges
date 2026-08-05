import 'dart:convert';
import 'package:http/http.dart' as http;

import '../models/task.dart';

class ApiService {
  final String baseUrl = "http://localhost:5000/api/tasks";         
  
  // GET ALL TASKS
  Future<List<Task>> getTasks() async {
    final response = await http.get(Uri.parse(baseUrl));

    if (response.statusCode == 200) {
      List data = jsonDecode(response.body);

      return data.map((e) => Task.fromJson(e)).toList();
    } else {
      throw Exception("Failed to load tasks");
    }
  }
Future<void> deleteTask(int id) async {
    final response = await http.delete(Uri.parse("$baseUrl/$id"));

    if (response.statusCode != 200) {
      throw Exception("Failed to delete task");
    }
  }
  // CREATE TASK
  Future<Task> addTask(String title) async {
    final response = await http.post(
      Uri.parse(baseUrl),

      headers: {"Content-Type": "application/json"},

      body: jsonEncode({"title": title}),
    );

    if (response.statusCode == 200) {
      return Task.fromJson(jsonDecode(response.body));
    } else {
      throw Exception("Failed to add task");
    }
  }
}
