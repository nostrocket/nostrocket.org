### Amdahl's Law: the more you need consensus, the less work you can do.

[Amdhal's Law](https://en.wikipedia.org/wiki/Amdahl%27s_law) is how computer scientists calculate how much speedup you get when adding additional cores/threads/workers to a process.

It's a fairly simple formula. The more sequential operations you have, the less speedup you get by adding additional threads because all of those threads need to pause execution and wait for the sequential parts of the process. It's a non-linear relationship: a tiny increase in wait-states drastically reduces the speedup gained when adding more threads.

In human organizations, we have the same thing. Individuals within the organization are workers or threads. Human organizations have a ratio of sequential to parallel operations, just like computer programs. The more a team needs to stop and synchronize, the less work they get done.

Do you need approval to start on work? Does your team have standards for language and platforms? Do you have to wait for approval to put your patch into production? These are all wait states or *organizational mutexes*.

If you spend one hour a day in meetings, that limits your effective team size to eight people. At best. In practice most of us who work in an organization spend a lot more than an hour a day getting consensus or consent before we can be productive.

Most organizations, e.g. Microsoft, think that the problem is team size, saying things like "people work better in smaller teams". This is incorrect.

The limiting factor is nothing to do with human nature or how people work. The limiting factor is how many minutes a day the workers within an organisation need to spend waiting for some kind of agreement on what work to do (often via a stand-up meeting or something) .

Read about the [Actor model](https://en.wikipedia.org/wiki/Actor_model), and use the Nostrocket protocol to become a message-driven, zero shared state Actor.

