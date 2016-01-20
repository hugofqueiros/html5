<div class="card" elevation="1">
    <header class="card-header">
        <div class="card-header-icon fa fa-street-view">
<!--            <svg>
                <use xlink:href="#<%= data.icon %>"></use>
            </svg>-->
        </div>
        <div class="card-header-title">
            <%= data.title %>
        </div>
    </header>
    <section class="card-body">

        <% if (data.cardType === 'default') { %>
        <div class="card-body-values">
            <div class="card-body-values-main">
                <%= data.mainValue %>
            </div>
            <div class="card-body-values-compare">
                <%= data.compValue %>
            </div>
        </div>
            <% if (data.diff >= 0 ) { %>
            <div class="card-body-diff card-body-diff-positive">
                <%= data.percentage %>
            </div>
            <% } else { %>
            <div class="card-body-diff card-body-diff-negative">
                <%= data.percentage %>
            </div>
            <% } %>

        <% } else if (data.cardType === 'chart') { %>
            <div class="chart"></div>
        <% } else if (data.cardType !== 'default') { %>
            Bedy none
        <% } %>
    </section>
    <% if (data.footer) { %>
    <footer class="card-footer">
        <%= data.footer %>
    </footer>
    <% } %>
</div>