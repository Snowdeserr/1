/**
 * Dieser Micro:bit-Code implementiert eine einfache Steuerung für ein Licht und einen Lüfter basierend auf den Eingaben über den A-Knopf des Micro:bit. Hier ist eine kurze Zusammenfassung der Funktionen:
 * 
 * 1. **Variablen:**
 * 
 * - `Lichtstatus`: Speichert den aktuellen Status des Lichts (an/aus) als 1 oder 0.
 * 
 * - `Lüfterstatus`: Speichert den aktuellen Status des Lüfters (an/aus) als 1 oder 0.
 * 
 * - `LüfterStart`: Speichert den Zeitpunkt, an dem der Lüfter zuletzt gestartet wurde (für die Lüftersteuerung).
 * 
 * 2. **Initialisierung:**
 * 
 * - Die Anfangswerte der Variablen werden auf 0 gesetzt.
 * 
 * - Die Pins P0, P1 und P2 werden initialisiert (P0 für die Lichtanzeige, P1 für das Licht und P2 für den Lüfter).
 * 
 * 3. **Button A-Event:**
 * 
 * - Wenn der A-Knopf gedrückt wird, wechselt der `Lichtstatus` zwischen an und aus.
 * 
 * 4. **Hauptprogrammschleife (basic.forever):**
 * 
 * - Die Helligkeit wird auf der LED-Matrix basierend auf dem Wert von Pin P0 angezeigt.
 * 
 * - Wenn das Licht eingeschaltet ist (`Lichtstatus == 1`):
 * 
 * - Der Licht-Pin (P1) wird auf 1 gesetzt.
 * 
 * - Wenn der Lüfter noch nicht gestartet wurde (`LüfterStart == 0`), wird die Startzeit gespeichert.
 * 
 * - Wenn das Licht ausgeschaltet ist:
 * 
 * - Wenn der Lüfter läuft (`Lüfterstatus == 1`), wird der Lüfter gestoppt, und die Wartezeit basierend auf der Helligkeit wird eingehalten.
 * 
 * - Andernfalls wird nur das Licht ausgeschaltet.
 * 
 * 5. **Zusätzliche forever-Schleife:**
 * 
 * - Überprüft, ob das Licht eingeschaltet ist und der Lüfter länger als 2000 Millisekunden (2 Sekunden) läuft. Falls ja, wird der Lüfter eingeschaltet (`Lüfterstatus = 1`), um die Luft zu bewegen.
 * 
 * Zusammengefasst steuert dieser Code ein einfaches System mit Licht und Lüfter, wobei das Licht manuell über den A-Knopf ein- und ausgeschaltet werden kann, und der Lüfter automatisch gestartet wird, wenn das Licht eingeschaltet ist und eine bestimmte Zeit vergangen ist.
 */
input.onButtonPressed(Button.A, function () {
    if (!(Lichtstatus)) {
        Lichtstatus = 1
    } else {
        Lichtstatus = 0
    }
})
let Lüfterstatus = 0
let LüfterStart = 0
let Lichtstatus = 0
Lichtstatus = 0
pins.analogWritePin(AnalogPin.P0, 0)
pins.digitalWritePin(DigitalPin.P1, 0)
pins.digitalWritePin(DigitalPin.P2, 0)
basic.forever(function () {
    led.plotBarGraph(
    pins.analogReadPin(AnalogPin.P0) / 170.5,
    6
    )
    if (Lichtstatus) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        if (!(LüfterStart)) {
            LüfterStart = input.runningTime()
        }
    } else {
        if (Lüfterstatus) {
            LüfterStart = 0
            pins.digitalWritePin(DigitalPin.P1, 0)
            basic.pause(pins.analogReadPin(AnalogPin.P0) * 1000 / 170.5)
            pins.digitalWritePin(DigitalPin.P2, 0)
            Lüfterstatus = 0
        } else {
            pins.digitalWritePin(DigitalPin.P1, 0)
            LüfterStart = 0
        }
    }
})
basic.forever(function () {
    if (Lichtstatus && input.runningTime() - LüfterStart > 2000) {
        pins.digitalWritePin(DigitalPin.P2, 1)
        Lüfterstatus = 1
    }
})
