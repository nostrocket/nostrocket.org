## The Nostrocket Protocol

*This is a work in progress, but here are some thoughts.*

Organizations are fundamentally composed of human action (and *inter*-action), so this is the primitive we must work with to create Nostrocket.

The usefulness of a bucket exists due to the limitations or restrictions imposed by its base and sides. A bucket is useful because it holds water by creating *boundary conditions* on what the water *cannot* do while *remaining in the bucket*.

Human organizational structures are useful because what they do with humans is analogous to what a bucket does with water. These structures are defined by their boundary conditions on human action - what type of action can humans take while remaining in the organizational structure.

### **Centrally planned** organizations like companies or governments restrict human action of members by:
* internal rules about what types of human action are permissible,
* internal rulers with the power to decide when to update the internal rules and when to break them,
* excluding people who "don't fit the culture" or aren't a "team player".

Centrally planned organizations exist along a spectrum of just how centrally planned they are - from highly planned and executed military organizations to the *Teal* organizations as described by Frederic Laloux (well worth skimming through his book).

### **Decentralized organizations** (DAOs) restrict human action of members by:
* deciding ahead of time on all the possible types of human action that is permissible, and
* encoding the rules about these actions into some form of state machine (usually a smart contract).

Decentralized organizations are typically inflexible due to this architecture. Changing the set of human action that is permissible within the organization usually requires smart contracts to be republished, which is where the community generally falls back to trusting a central team.

There are more flexible decentralized organizational structures, but they invariably require upfront consensus on what to do and how to do it. This precludes scaling because the more you need [upfront consensus](/mutexes.html) the less speedup you get by adding additional "workers". The flipside to precluding scale is precluding efficiency.

Something similar happens when any type of upfront funding is involved. It not only creates a honeypot with an associated overhead to defend it, but also precludes the ability to do anything without widespread agreement on what to do. Nostrocket only allows funding in *response* to work that has already been done.

* * * 

### The metric we use to judge if Nostrocket has optimal boundary conditions on human action is the **community size** - are humans being attracted to Nostrocket faster than any alternative?

Humans with something to contribute should be better off by acting *within* a Subrocket than they are by acting outside of it.
* Nostrocket must result in more value for participants than any other opportunity available to them.
* Nostrocket must become, and actively remain, the most efficient organizational paradigm available
  * The mechanism by which work gets done within Subrockets SHOULD NOT *require* upfront agreement on what that work should involve or what the end result should look like
    * Subrockets MUST NOT *require* any upfront funding and MUST NOT *be capable* of retaining any capital (non-custodial, can't be evil)
    * To remove any internal friction, Subrockets must be radically fair to all participants regardless of how early or late they are
        * Nostrocket's rules and ideology must be as pristine and *credibly neutral* as possible
        * It's not possible to be as pristine and neutral as Bitcoin because Nostrocket is an organizational paradigm while Bitcoin is property, but Bitcoin is the standard to judge against.
* The boundary conditions or limitations should be simple, explicit, clear, and graduated such that there's no overhead required to onboard new Participants into Subrockets.
* Amdahl's law can be restated as "the more you need consensus about what to build, the more inefficient you will be at building it". For Subrockets to be the most efficient problem solvers and builders, they must require the least amount of consensus on what to build and how to build it.

* * * 

## An Ideal Nostrocket Protocol

The core of Nostrocket must be a hill-climbing algorithm which optimises for increasing the number of Participants. If the size of the community around Nostrocket is not increasing, it's not working.

Software can be used to make things more efficient and to provide continuity of the state of Subrockets, but the algorithm itself is primarily executed by self-interested human action and not a machine.

Human action within Subrockets must be executed for purely self-interested reasons in order for it to be optimally efficient, accurate, scalable, and to minimise any social attack surface. 

People need to pay the rent and be protected from burnout, but when people solve problems for their own reasons the solutions are more accurate than when they are doing it because someone is paying them. A case in point: organic contributions to wikipedia vs. paid contributions.

The life-force (or fuel) of civilisation is human action that yields surplus - that means production of surplus is in the critical path to more Participants, and so our algorithm must optimise for this.

## What does this protocol look like?

The protoocol is a work in progress, but this is the general idea of what to codify into a set of rules.

1. A Subrocket starts with a problem statement from the project creator.
    * This is the starting point because for a project to be a success it must solve a real problem for real people.
2. The project creator refines the problem statement into a very simple mission statement. 
    * A software project is the codification of the values of a group of people. The mission statement is the stated reason for the group to exist.
    * Some good mission statement examples: 
        * *Reddit: the front page of the Internet*
        * *Wikipedia: the free encyclopedia that anyone can edit*
3. Anyone who's not already a *Participant* in the project MAY become a Participant by being validated by any existing Participant. This results in a *tree of Participants* starting with the project creator.
4. The project creator SHOULD produce a minimal solution in less than 6 weeks. This is to test the assumption that there are people who care enough about the problem to use the solution.
    * Participants MAY contribute to building this minimal solution by sending patches.
    * Existing projects can skip this step if they already have at least a minimal solution.
5. Now that we have a minimal solution, change follows the [Serbian method](#) - a continuous pattern of accurately identifying *Problems* that are relevant to the project, and applying the *simplest possible solution* to each Problem.
    * The project is probably applicable only to a *very* tiny subset of humanity who are able to do something useful with it, but this subset should get *less tiny* with each problem solved.
    * If it's solving a real problem, users of the solution will provide feedback. This should be captured on the Nostrocket problem tracker
        * There are no bug reports or feature requests, these are just problems (or they aren't).
        * There are no priority levels for problems, there are just problems that are worth solving (or not).
        * Problems should be reasoned about and broken down into smaller problems until they are replicable and actionable.
        * Problems should be broken down until they are small enough that they can be solved very quickly - anything longer than 6 hours of working time is probably too big. 
6. Any Participant MAY *Claim* (and solve, usually with a *Patch*) any unclaimed [Problem](#). Any [Maintainer](#) can (and should) *Merge* any pull request that does *not* violate the [Nostrocket protocol](#).
7. A Participant who solves a Problem MAY create an [Expense](#) for their work, denominated in Satoshi.
    * this is a way for a Participant to tell other Participants how much time/effort they spent in solving the problem
    * the participant submitting the expense decides how much their pull request is worth, and everyone else decides if they are full of shit or not.
8. Participants with *Votepower* MAY vote to approve or reject an Expense.
    * The Expense SHOULD be rejected unless it's along the route (or *critical path*) to more users or revenue for the project.
    * Votepower is a measure of a participant's *skin in the game* or how committed they are to the project.
        * `Votepower = Shares * Leadtime`
        * Every Participant's `Leadtime` starts at `0`.
        * A Participant's Shares *cannot* be spent/transferred if their `Leadtime > 0`.
        * A Participant MAY increase or decrease their Leadtime by `1` every 2,016 blocks (but can't become negative)
        * If more than 50% of the project's Votepower approves an Expense, and less than 5% reject it, its Approved.
9. If an Expense is *Approved* new [Shares](#) in the project are created and they belong to the Participant who claimed the Expense
     * Shares are created 1:1 per Satoshi claimed in the Expense
     * All revenue that the project generates goes straight to Shareholders (Nostrocket is noncustodial)
     * Shares exist in an order based on when they were created, this order is reset if shares are sold. This is the order in which shares get repaid from revenue generated by the project.
     * There is a benefit in having shares earlier when the risk is higher, but this aspect requires more thinking and discussion to ensure that everyone from the early contributors to the people who come along years later are both happy that it's fair and logical.
     * Shares MUST ONLY ever be created by approving an expense and MUST NOT be created *any other way*
     * Each Subrocket is instantiated with a *single* share to bootstrap the Votepower process (the project creator owns the first share).
10. Participants own *all* revenue produced by the project, the Sats are streamed *directly* to Participants in proportion to the number of Shares they have and how long they've had them.
     * When there's a pot of money available, Mallory finds a way to corrupt whatever is guarding it.
     * Nostrocket MUST NOT store any capital or raise any funds. It is completely non-custodial and value can only transfer between people using Nostrocket but not to or from Nostrocket itself.

## How shares are created
![Swimlane](images/swimlane.png)