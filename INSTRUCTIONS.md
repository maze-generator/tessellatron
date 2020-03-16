# Graphs Modeling Project
It's your turn to tackle a real world problem using your graph theory skills.
You will implement graph theory solutions in python for small amounts of data within your problem scope and then innovate towards solutions when working with data at scale.

## Project Requirements
### Choose the Problem
Choose a problem from the provided list or a different problem that can be modeled and a graph and has solutions that can be implemented with graph algorithms from this class.
You must use at least 3 different algorithms to define at least 3 different solutions.

> #### Example
> Given a network of friends, find the biggest influencer&mdash;the largest group of friends who all know each other&mdash;and the shortest path for a message to pass from person A to person B via friends.

### Model the Problem
Represent the problem and the desired solutions using graphs and graph theory.

> #### Example
> The **network of friends** is modeled with each person being a *vertex* in a *graph* and an *edge* between any two people if they are friends.
>
> The **biggest influencer** is the *maximum degree* of the graph.
>
> The **largest group of friends** is the *maximal clique number* in the graph.
> This can be approximated by *Turán's Theorem*.
>
> The **shortest path for a message** can be found in the graph via *Dijkstra's Algorithm*.

### Implement Graph &amp; Algorithms
Create a python program (from scratch; not using graph libraries) that can read in a small (n < 30) version of your problem from an input and solve the algorithms above.
Your code should:
- have documentation that fully defines the problem scope and solutions
- have documentation that discusses optimization and scaling
- work on any data set which meets problem specifications as defined in your documentation
- be available as a public repository on GitHub

### Discuss the Project
Create a presentation or blog post of your project.

## Stretch Challenges
### Improve Scalability
Implement a more scalable solution using tools like Dynamic Programming or by using a different algorithm that solves the same problem faster.

### Independent Research
Implement a common graph algorithm that was not covered in class on your program.

### Use Graph Libraries
Use graph libraries to refactor your code implementations, benchmark and compare results.

### Create a Website
Use your python code or create javascript code that takes inputs for your problem and outputs its solution in your browser.
