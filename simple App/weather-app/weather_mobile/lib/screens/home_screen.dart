import 'package:flutter/material.dart';

import '../models/task.dart';
import '../services/api_services.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ApiService api = ApiService();
  bool isAdding = false;
  late Future<List<Task>> tasks;

  final TextEditingController controller = TextEditingController();

  @override
  void initState() {
    super.initState();

    tasks = api.getTasks();
  }

  void refresh() {
    setState(() {
      tasks = api.getTasks();
    });
  }

  Future<void> addTask() async {
    if (controller.text.trim().isEmpty) {
      return;
    }

    setState(() {
      isAdding = true;
    });

    await api.addTask(controller.text);

    controller.clear();

    setState(() {
      isAdding = false;
    });

    refresh();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Task Manager")),

      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(12),

            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: controller,

                    decoration: const InputDecoration(hintText: "Enter task"),
                  ),
                ),

                IconButton(onPressed: addTask, icon: const Icon(Icons.add)),
              ],
            ),
          ),

          Expanded(
            child: FutureBuilder<List<Task>>(
              future: tasks,

              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }

                if (snapshot.hasError) {
                  return Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,

                      children: [
                        const Icon(Icons.error, size: 50),

                        const SizedBox(height: 10),

                        Text("Failed to load tasks"),

                        ElevatedButton(
                          onPressed: refresh,

                          child: const Text("Retry"),
                        ),
                      ],
                    ),
                  );
                }

                final data = snapshot.data!;

                return ListView.builder(
                  itemCount: data.length,

                  itemBuilder: (context, index) {
                    final task = data[index];

                    return ListTile(
                      title: Text(task.title),

                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,

                        children: [
                          Icon(
                            task.completed ? Icons.check_circle : Icons.pending,
                          ),
isAdding

? const CircularProgressIndicator()

:

IconButton(

onPressed:addTask,

icon:const Icon(Icons.add),

),
                          IconButton(
                            icon: const Icon(Icons.delete),

                            onPressed: () async {
                              await api.deleteTask(task.id);

                              refresh();
                            },
                          ),
                        ],
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
