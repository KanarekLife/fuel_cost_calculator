<script lang="ts">
    let totalDistance: number | null = $state(getValueFromLocalStorage('totalDistance'));
    let averageFuelConsumption: number | null = $state(getValueFromLocalStorage('averageFuelConsumption'));
    let costOfFuel: number | null = $state(getValueFromLocalStorage('costOfFuel'));
    let numberOfPeople: number | null = $state(getValueFromLocalStorage('numberOfPeople'));

    let totalCost = $derived(!!totalDistance && !!averageFuelConsumption && !!costOfFuel ? (totalDistance * averageFuelConsumption * costOfFuel / 100) : null);
    let costPerPerson = $derived(!!totalCost && !!numberOfPeople ? (totalCost / numberOfPeople) : null);

    let totalCostFormatted = $derived(!!totalCost ? totalCost.toFixed(2) : '0.00');
    let costPerPersonFormatted = $derived(!!costPerPerson ? costPerPerson.toFixed(2) : '0.00');

    $effect(() => {
        saveValueToLocalStorage('totalDistance', totalDistance);
        saveValueToLocalStorage('averageFuelConsumption', averageFuelConsumption);
        saveValueToLocalStorage('costOfFuel', costOfFuel);
        saveValueToLocalStorage('numberOfPeople', numberOfPeople);
    });

    function saveValueToLocalStorage(key: 'totalDistance' | 'averageFuelConsumption' | 'costOfFuel' | 'numberOfPeople', value: number | null): void {
        if (!value) {
            return;
        }

        localStorage.setItem(key, value.toString());
    }

    function getValueFromLocalStorage(key: 'totalDistance' | 'averageFuelConsumption' | 'costOfFuel' | 'numberOfPeople'): number | null {
        const value = localStorage.getItem(key);
        
        if (!value) {
            return null;
        }

        return parseFloat(value);
    }

</script>

<main class="py-4">
    <h1 class="title has-text-centered">Fuel Cost Calculator</h1>

    <div class="container py-4 is-flex is-justify-content-space-between is-align-items-center">
        <span class="is-flex is-gap-2">
            <span>Total Cost: <strong>{totalCostFormatted} zł</strong></span>
            <span>Cost per Person: <strong>{costPerPersonFormatted} zł</strong></span>
        </span>
    </div>

    <section class="container">
        <div class="field has-addons">
            <p class="control is-expanded has-icons-left">
                <input class="input" type="number" placeholder="Distance" bind:value={totalDistance} />
                <span class="icon is-small is-left">
                    <i class="fas fa-road white"></i>
                </span>
            </p>
            <p class="control">
                <a class="button is-static" href="/" tabindex="-1">
                    km
                </a>
            </p>
        </div>
        <div class="field has-addons">
            <p class="control is-expanded has-icons-left">
                <input class="input" type="number" placeholder="Average Fuel Consumption" bind:value={averageFuelConsumption} />
                <span class="icon is-small is-left">
                    <i class="fas fa-gauge white"></i>
                </span>
            </p>
            <p class="control">
                <a class="button is-static" href="/" tabindex="-1">
                    l / 100km
                </a>
            </p>
        </div>
        <div class="field has-addons">
            <p class="control is-expanded has-icons-left">
                <input class="input" type="number" placeholder="Cost of Fuel" bind:value={costOfFuel} />
                <span class="icon is-small is-left">
                    <i class="fas fa-gas-pump white"></i>
                </span>
            </p>
            <p class="control">
                <a class="button is-static" href="/" tabindex="-1">
                    zł / l
                </a>
            </p>
        </div>
        <div class="field has-addons">
            <p class="control is-expanded has-icons-left">
                <input class="input" type="number" placeholder="Number of People" bind:value={numberOfPeople} />
                <span class="icon is-small is-left">
                    <i class="fas fa-user white"></i>
                </span>
            </p>
            <p class="control">
                <a class="button is-static" href="/">
                    people
                </a>
            </p>
        </div>
    </section>
</main>
