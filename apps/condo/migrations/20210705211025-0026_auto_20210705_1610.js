// auto generated by kmigrator
// KMIGRATOR:0026_auto_20210705_1610:IyBHZW5lcmF0ZWQgYnkgRGphbmdvIDMuMi41IG9uIDIwMjEtMDctMDUgMTY6MTAKCmZyb20gZGphbmdvLmRiIGltcG9ydCBtaWdyYXRpb25zCgoKY2xhc3MgTWlncmF0aW9uKG1pZ3JhdGlvbnMuTWlncmF0aW9uKToKCiAgICBkZXBlbmRlbmNpZXMgPSBbCiAgICAgICAgKCdfZGphbmdvX3NjaGVtYScsICcwMDI1X2F1dG9fMjAyMTA2MjlfMTcwNycpLAogICAgXQoKICAgIG9wZXJhdGlvbnMgPSBbCiAgICAgICAgbWlncmF0aW9ucy5SZW5hbWVGaWVsZCgKICAgICAgICAgICAgbW9kZWxfbmFtZT0ndGlja2V0JywKICAgICAgICAgICAgb2xkX25hbWU9J2VudHJhbmNlTmFtZScsCiAgICAgICAgICAgIG5ld19uYW1lPSdzZWN0aW9uTmFtZScsCiAgICAgICAgKSwKICAgICAgICBtaWdyYXRpb25zLlJlbmFtZUZpZWxkKAogICAgICAgICAgICBtb2RlbF9uYW1lPSd0aWNrZXRjaGFuZ2UnLAogICAgICAgICAgICBvbGRfbmFtZT0nZW50cmFuY2VOYW1lRnJvbScsCiAgICAgICAgICAgIG5ld19uYW1lPSdzZWN0aW9uTmFtZUZyb20nLAogICAgICAgICksCiAgICAgICAgbWlncmF0aW9ucy5SZW5hbWVGaWVsZCgKICAgICAgICAgICAgbW9kZWxfbmFtZT0ndGlja2V0Y2hhbmdlJywKICAgICAgICAgICAgb2xkX25hbWU9J2VudHJhbmNlTmFtZVRvJywKICAgICAgICAgICAgbmV3X25hbWU9J3NlY3Rpb25OYW1lVG8nLAogICAgICAgICksCiAgICAgICAgbWlncmF0aW9ucy5SZW5hbWVGaWVsZCgKICAgICAgICAgICAgbW9kZWxfbmFtZT0ndGlja2V0aGlzdG9yeXJlY29yZCcsCiAgICAgICAgICAgIG9sZF9uYW1lPSdlbnRyYW5jZU5hbWUnLAogICAgICAgICAgICBuZXdfbmFtZT0nc2VjdGlvbk5hbWUnLAogICAgICAgICksCiAgICBdCg==

exports.up = async (knex) => {
    await knex.raw(`
    BEGIN;
--
-- Rename field entranceName on ticket to sectionName
--
ALTER TABLE "Ticket" RENAME COLUMN "entranceName" TO "sectionName";
--
-- Rename field entranceNameFrom on ticketchange to sectionNameFrom
--
ALTER TABLE "TicketChange" RENAME COLUMN "entranceNameFrom" TO "sectionNameFrom";
--
-- Rename field entranceNameTo on ticketchange to sectionNameTo
--
ALTER TABLE "TicketChange" RENAME COLUMN "entranceNameTo" TO "sectionNameTo";
--
-- Rename field entranceName on tickethistoryrecord to sectionName
--
ALTER TABLE "TicketHistoryRecord" RENAME COLUMN "entranceName" TO "sectionName";
COMMIT;

    `)
}

exports.down = async (knex) => {
    await knex.raw(`
    BEGIN;
--
-- Rename field entranceName on tickethistoryrecord to sectionName
--
ALTER TABLE "TicketHistoryRecord" RENAME COLUMN "sectionName" TO "entranceName";
--
-- Rename field entranceNameTo on ticketchange to sectionNameTo
--
ALTER TABLE "TicketChange" RENAME COLUMN "sectionNameTo" TO "entranceNameTo";
--
-- Rename field entranceNameFrom on ticketchange to sectionNameFrom
--
ALTER TABLE "TicketChange" RENAME COLUMN "sectionNameFrom" TO "entranceNameFrom";
--
-- Rename field entranceName on ticket to sectionName
--
ALTER TABLE "Ticket" RENAME COLUMN "sectionName" TO "entranceName";
COMMIT;

    `)
}
