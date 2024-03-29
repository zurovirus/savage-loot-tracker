import { formatDistanceToNow, format } from "date-fns";

// This component is responsible for displaying player's loot.
export default function DisplayPlayerLoot({ playerloots, fightId }) {
  // Groups the player's loot by date.
  function groupLootByDate(playerLoot) {
    const lootByDate = {};

    playerLoot.forEach((item) => {
      const date = item.date;
      if (!lootByDate[date]) {
        lootByDate[date] = [];
      }
      lootByDate[date].push(item);
    });

    return lootByDate;
  }

  return (
    <div>
      {Object.keys(
        groupLootByDate(
          playerloots.filter((loot) => loot.loot.fights[0].id === fightId)
        )
      ).map((date) => (
        <div key={date}>
          <p className="mx-4 my-2 text-amber-400">{`Looted ${formatDistanceToNow(
            new Date(date)
          )} ago`}</p>
          <p className="mx-4 text-amber-400 text-end">
            {format(date, "MMMM dd, yyyy HH:mm:ss")}
          </p>
          {groupLootByDate(
            playerloots.filter((loot) => loot.loot.fights[0].id === fightId)
          )[date].map(({ id, loot }) => (
            <div key={id} className="flex mx-6 my-2">
              <img
                src={`https://xivapi.com${loot.image}`}
                alt={loot.name}
                className="object-none"
              />
              <p className="mx-2">{loot.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
